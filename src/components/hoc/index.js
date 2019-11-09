import _ErrorBoundary from './ErrorBoundary';
import { withErrorBoundary } from './ErrorBoundary';
import _RouteWithSubRoutes from './RouteWithSubRoutes';

export const ErrorBoundary = _ErrorBoundary;
export const withErrorBoundaryWrapper = withErrorBoundary;
export const RouteWithSubRoutes = _RouteWithSubRoutes;
