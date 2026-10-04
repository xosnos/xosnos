interface LogContext {
  route?: string;
  provider?: string;
  operation?: string;
  status?: number;
  error?: unknown;
}

function serializeError(error: unknown) {
  if (error instanceof Error) {
    // SDK errors may carry request headers, bodies, or credentials. Never spread
    // them or serialize their cause; keep only the diagnostic Error fields.
    return { name: error.name, message: error.message, stack: error.stack };
  }

  return {
    name: 'NonError',
    message: typeof error === 'string' ? error : 'Unknown thrown value',
  };
}

function write(level: 'info' | 'error', event: string, context: LogContext) {
  // Explicit fields prevent accidental logging of request bodies, tokens, and
  // other extra properties supplied by callers at runtime.
  const record = {
    timestamp: new Date().toISOString(),
    level,
    event,
    route: context.route,
    provider: context.provider,
    operation: context.operation,
    status: context.status,
    error: context.error === undefined ? undefined : serializeError(context.error),
  };

  // One JSON record per line, including escaped newlines in messages/stacks.
  console[level](JSON.stringify(record));
}

export const logger = {
  info(event: string, context: LogContext = {}) {
    write('info', event, context);
  },
  error(event: string, context: LogContext = {}) {
    write('error', event, context);
  },
};
