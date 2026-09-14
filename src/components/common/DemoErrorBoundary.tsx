import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
  onReturnToShowroom?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  copied: boolean;
}

export class DemoErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    copied: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false,
      copied: false
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DemoErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleRestart = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReturnToShowroom = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReturnToShowroom) {
      this.props.onReturnToShowroom();
    }
  };

  private handleCopy = () => {
    const text = `${this.state.error?.toString()}\n\nStack:\n${this.state.errorInfo?.componentStack || ''}`;
    navigator.clipboard.writeText(text);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-rose-500/30 my-6 backdrop-blur-sm text-slate-100">
          <div className="max-w-lg w-full text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Demo Encountered a Hiccup
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The current view encountered an unexpected state. No data was lost, and you can instantly reload this demo or return to the showroom.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleRestart}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                Restart Demo View
              </button>
              
              <button
                onClick={this.handleReturnToShowroom}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all active:scale-95"
              >
                <Home className="w-4 h-4" />
                Back to Showroom
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 text-left">
              <button
                onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                className="flex items-center justify-between w-full text-xs text-slate-500 hover:text-slate-400 transition-colors py-1"
              >
                <span>Diagnostic Details</span>
                {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {this.state.showDetails && (
                <div className="mt-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono text-rose-400/90 overflow-x-auto max-h-48 relative">
                  <button
                    onClick={this.handleCopy}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copy Error"
                  >
                    {this.state.copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <p className="font-semibold mb-1">{this.state.error?.toString()}</p>
                  <pre className="text-[11px] text-slate-400 whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
