import { CardState } from "./types";
import { renderCardToBlob, downloadBlob, pngFileName } from "./exportPng";

export type ShareResult = "shared" | "downloaded" | "cancelled";

function shareText(state: CardState): string {
  const quote = state.quote.trim();
  const attribution = [state.book.trim(), state.author.trim()]
    .filter(Boolean)
    .join(" — ");
  return attribution ? `“${quote}”\n— ${attribution}` : quote;
}

/**
 * Render the card and hand the PNG to the native share sheet (Instagram,
 * WhatsApp, X, Pinterest, "Save to device", …) via the Web Share API. Falls
 * back to a direct download when file-sharing isn't supported (e.g. desktop or
 * a plain WebView).
 */
export async function sharePng(state: CardState): Promise<ShareResult> {
  const blob = await renderCardToBlob(state);
  const file = new File([blob], pngFileName(state), { type: "image/png" });

  const canShareFiles =
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] });

  if (canShareFiles && typeof navigator.share === "function") {
    try {
      await navigator.share({
        files: [file],
        title: "BookSkim quote",
        text: shareText(state),
      });
      return "shared";
    } catch (err) {
      // user dismissed the sheet — not an error
      if (err instanceof DOMException && err.name === "AbortError") {
        return "cancelled";
      }
      // otherwise fall through to a download
    }
  }

  downloadBlob(blob, file.name);
  return "downloaded";
}
