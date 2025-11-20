function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="mb-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
              >
                <animate
                  attributeName="stop-color"
                  values="#3b82f6;#06b6d4;#8b5cf6;#3b82f6"
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
                  values="#06b6d4;#8b5cf6;#3b82f6;#06b6d4"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            <linearGradient id="loadGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
              >
                <animate
                  attributeName="stop-color"
                  values="#8b5cf6;#3b82f6;#06b6d4;#8b5cf6"
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
                  values="#06b6d4;#8b5cf6;#3b82f6;#06b6d4"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            <filter id="loadGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#loadGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
            transform="rotate(-90 100 100)"
            filter="url(#loadGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="251.2;0;251.2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="url(#loadGrad2)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="188.4"
            strokeDashoffset="0"
            transform="rotate(90 100 100)"
            opacity="0.6"
            filter="url(#loadGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-188.4;0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="url(#loadGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="125.6"
            strokeDashoffset="125.6"
            transform="rotate(-90 100 100)"
            opacity="0.4"
            filter="url(#loadGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="125.6;0;125.6"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="100"
            cy="20"
            r="6"
            fill="url(#loadGrad)"
            filter="url(#loadGlow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;360 100 100"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="100"
            cy="180"
            r="6"
            fill="url(#loadGrad2)"
            filter="url(#loadGlow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;-360 100 100"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="20"
            cy="100"
            r="5"
            fill="url(#loadGrad)"
            filter="url(#loadGlow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;360 100 100"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="180"
            cy="100"
            r="5"
            fill="url(#loadGrad2)"
            filter="url(#loadGlow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;-360 100 100"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="100"
            cy="100"
            r="8"
            fill="url(#loadGrad)"
            filter="url(#loadGlow)"
          >
            <animate
              attributeName="r"
              values="8;12;8"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <div className="space-y-4 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-x">
            Loading
          </h2>

          <div className="flex justify-center gap-2">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>

          <p className="text-slate-400 text-sm animate-pulse">
            Please wait while we prepare everything for you...
          </p>
        </div>

        <div className="mt-16 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default LoadingScreen;
