import React from "react";
import useMedia from "../../../src/hooks/useMedia";

export default {
  title: "Hooks/useMedia",
  parameters: {
    componentSubtitle: "Hook that responds to media queries",
    docs: {
      description: {
        component:
          "A React hook that evaluates CSS media queries and returns whether they match the current viewport.",
      },
    },
  },
};

export const Default = () => {
  const { matches: isMobile, error: mobileError } =
    useMedia("(max-width: 480px)");
  const { matches: isTablet, error: tabletError } = useMedia(
    "(min-width: 481px) and (max-width: 1024px)"
  );
  const { matches: isDesktop, error: desktopError } = useMedia(
    "(min-width: 1025px)"
  );
  const { matches: isDarkMode, error: darkModeError } = useMedia(
    "(prefers-color-scheme: dark)"
  );
  const { matches: prefersReducedMotion, error: motionError } = useMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Combined error from any media query
  const hasError =
    mobileError || tabletError || desktopError || darkModeError || motionError;

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "4px" }}
    >
      <h3>Media Query Detection Demo</h3>

      {hasError && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            border: "1px solid #ffcdd2",
            borderRadius: "4px",
          }}
        >
          <strong>Error:</strong> There was a problem with media queries.
          <div style={{ marginTop: "5px", fontSize: "14px" }}>
            {hasError.message}
          </div>
        </div>
      )}

      <p style={{ marginBottom: "20px" }}>
        This demo uses the <code>useMedia</code> hook to respond to different
        viewport sizes and user preferences. Resize your browser window to see
        the values change.
      </p>

      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          backgroundColor: isMobile
            ? "#fff9c4"
            : isTablet
            ? "#e1f5fe"
            : "#e8f5e9",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
        }}
      >
        <h4 style={{ marginTop: "0" }}>Current Device Type:</h4>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "10px",
            color: isMobile ? "#f57c00" : isTablet ? "#0277bd" : "#2e7d32",
          }}
        >
          {isMobile ? "📱 Mobile" : isTablet ? "📱 Tablet" : "💻 Desktop"}
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Media Query
            </th>
            <th
              style={{
                padding: "10px",
                textAlign: "center",
                borderBottom: "2px solid #ddd",
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <MediaQueryRow
            label="Mobile"
            query="(max-width: 480px)"
            isMatching={isMobile}
            error={mobileError}
          />
          <MediaQueryRow
            label="Tablet"
            query="(min-width: 481px) and (max-width: 1024px)"
            isMatching={isTablet}
            error={tabletError}
          />
          <MediaQueryRow
            label="Desktop"
            query="(min-width: 1025px)"
            isMatching={isDesktop}
            error={desktopError}
          />
          <MediaQueryRow
            label="Dark Mode"
            query="(prefers-color-scheme: dark)"
            isMatching={isDarkMode}
            error={darkModeError}
          />
          <MediaQueryRow
            label="Reduced Motion"
            query="(prefers-reduced-motion: reduce)"
            isMatching={prefersReducedMotion}
            error={motionError}
          />
        </tbody>
      </table>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ marginTop: "0" }}>Content Adaptation Example:</h4>
        <div style={{ marginTop: "15px" }}>
          {isMobile ? (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            >
              <h5>Mobile Layout</h5>
              <p>Simplified content for small screens</p>
              <div
                style={{
                  height: "50px",
                  backgroundColor: "#f57c00",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              ></div>
              <div
                style={{
                  height: "50px",
                  backgroundColor: "#f57c00",
                  borderRadius: "4px",
                  opacity: 0.7,
                }}
              ></div>
            </div>
          ) : isTablet ? (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            >
              <h5>Tablet Layout</h5>
              <p>Balanced content for medium screens</p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "80px",
                    backgroundColor: "#0277bd",
                    borderRadius: "4px",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "80px",
                    backgroundColor: "#0277bd",
                    borderRadius: "4px",
                    opacity: 0.7,
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            >
              <h5>Desktop Layout</h5>
              <p>Full content for large screens</p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "120px",
                    backgroundColor: "#2e7d32",
                    borderRadius: "4px",
                  }}
                ></div>
                <div
                  style={{
                    flex: 2,
                    height: "120px",
                    backgroundColor: "#2e7d32",
                    borderRadius: "4px",
                    opacity: 0.8,
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "120px",
                    backgroundColor: "#2e7d32",
                    borderRadius: "4px",
                    opacity: 0.6,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p style={{ marginTop: "20px", fontStyle: "italic", color: "#666" }}>
        Resize your browser window to see the responsive changes. Note that dark
        mode and reduced motion preferences depend on your system settings.
      </p>
    </div>
  );
};

const MediaQueryRow = ({ label, query, isMatching, error }) => (
  <tr>
    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <div>
        <strong>{label}</strong>
      </div>
      <div style={{ fontSize: "14px", color: "#666", fontFamily: "monospace" }}>
        {query}
      </div>
      {error && (
        <div style={{ fontSize: "13px", color: "#c62828", marginTop: "5px" }}>
          Error: {error.message}
        </div>
      )}
    </td>
    <td
      style={{
        padding: "10px",
        textAlign: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "20px",
          backgroundColor: error
            ? "#f5f5f5"
            : isMatching
            ? "#e8f5e9"
            : "#ffebee",
          color: error ? "#757575" : isMatching ? "#2e7d32" : "#c62828",
          fontWeight: "bold",
        }}
      >
        {error ? "Error" : isMatching ? "Matching" : "Not Matching"}
      </span>
    </td>
  </tr>
);

Default.storyName = "Basic Usage";
