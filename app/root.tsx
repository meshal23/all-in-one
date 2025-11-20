import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Spinner } from "components/ui/shadcn-io/spinner";
import { ArrowLeft, Home, Search } from "lucide-react";
import LoadingScreen from "./components/main/LoadinScreen";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <LoadingScreen />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    // <main className="pt-16 p-4 container mx-auto">
    //   <h1>{message}</h1>
    //   <p>{details}</p>
    //   {stack && (
    //     <pre className="w-full p-4 overflow-x-auto">
    //       <code>{stack}</code>
    //     </pre>
    //   )}
    // </main>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="mb-8 flex justify-center animate-float">
          <svg
            width="400"
            height="300"
            viewBox="0 0 400 300"
            className="w-full max-w-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                >
                  <animate
                    attributeName="stop-color"
                    values="#3b82f6;#06b6d4;#3b82f6"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop
                  offset="100%"
                  style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                >
                  <animate
                    attributeName="stop-color"
                    values="#06b6d4;#3b82f6;#06b6d4"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="200"
              cy="150"
              r="80"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="3"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="80;90;80"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <g className="animate-dash">
              <path
                d="M 150 80 Q 200 30 250 80"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                strokeDasharray="200"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="200;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            <circle
              cx="170"
              cy="130"
              r="12"
              fill="url(#grad1)"
              filter="url(#glow)"
            >
              <animate
                attributeName="cy"
                values="130;125;130"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="230"
              cy="130"
              r="12"
              fill="url(#grad1)"
              filter="url(#glow)"
            >
              <animate
                attributeName="cy"
                values="130;125;130"
                dur="1.5s"
                begin="0.2s"
                repeatCount="indefinite"
              />
            </circle>

            <path
              d="M 170 180 Q 200 200 230 180"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            >
              <animate
                attributeName="d"
                values="M 170 180 Q 200 200 230 180;M 170 185 Q 200 205 230 185;M 170 180 Q 200 200 230 180"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            <g opacity="0.6">
              <rect
                x="80"
                y="100"
                width="30"
                height="80"
                rx="15"
                fill="url(#grad1)"
                filter="url(#glow)"
              >
                <animate
                  attributeName="height"
                  values="80;70;80"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="100;105;100"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="290"
                y="100"
                width="30"
                height="80"
                rx="15"
                fill="url(#grad1)"
                filter="url(#glow)"
              >
                <animate
                  attributeName="height"
                  values="80;70;80"
                  dur="1.8s"
                  begin="0.3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="100;105;100"
                  dur="1.8s"
                  begin="0.3s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>

            <circle cx="120" cy="80" r="4" fill="#06b6d4" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="80;60;80"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="280" cy="90" r="4" fill="#3b82f6" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.8s"
                begin="0.3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="90;70;90"
                dur="1.8s"
                begin="0.3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="200" cy="240" r="4" fill="#06b6d4" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                begin="0.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="240;260;240"
                dur="2s"
                begin="0.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <div className="mb-8 relative">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 leading-none tracking-tighter animate-gradient-x drop-shadow-2xl">
            404
          </h1>
        </div>

        <div className="space-y-4 mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-slide-down">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto animate-slide-up">
            Oops! The page you're looking for seems to have wandered off into
            the digital void. Don't worry, even the best explorers get lost
            sometimes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <button
            onClick={() => navigate("/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </div>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-slate-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:animate-bounce-x" />
              <span>Go Back</span>
            </div>
          </button>

          <button className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-slate-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </div>
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-2 animate-fade-in">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 text-sm animate-fade-in">
        Error Code: 404 | Page Not Found
      </div>
    </div>
  );
}
