import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Copy, ExternalLink, Download } from "lucide-react";
import { getTableMenuScanUrl } from "@/utils/tableMenuUrl";
import { toast } from "sonner";

type Props = {
  tableNumber: string;
  onRemove?: () => void;
};

export function TableQrCard({ tableNumber, onRemove }: Props) {
  const [dataUrl, setDataUrl] = useState("");
  const url = getTableMenuScanUrl(tableNumber);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, {
      width: 220,
      margin: 2,
      color: { dark: "#1B1033", light: "#EFE6D6" },
    })
      .then((src) => {
        if (!cancelled) setDataUrl(src);
      })
      .catch(() => {
        if (!cancelled) setDataUrl("");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié");
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `beluga-table-${tableNumber}.png`;
    a.click();
  };

  return (
    <article className="beluga-glass flex flex-col items-center p-5 text-center">
      <p className="beluga-eyebrow">Table</p>
      <p className="mt-1 font-cormorant text-4xl font-semibold text-beluga-champagne">{tableNumber}</p>

      <div className="mt-4 grid h-[220px] w-[220px] place-items-center border border-beluga-gold/20 bg-beluga-champagne/95 p-2">
        {dataUrl ? (
          <img src={dataUrl} alt={`QR code table ${tableNumber}`} className="h-full w-full" />
        ) : (
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-beluga-violet border-t-transparent" />
        )}
      </div>

      <p className="mt-3 max-w-full truncate font-raleway text-[0.65rem] text-beluga-champagne/50" title={url}>
        {url}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 border border-beluga-gold/30 px-3 py-1.5 font-raleway text-[0.65rem] uppercase tracking-[0.18em] text-beluga-champagne hover:border-beluga-gold hover:text-beluga-gold"
        >
          <Copy size={12} /> Copier
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 border border-beluga-gold/30 px-3 py-1.5 font-raleway text-[0.65rem] uppercase tracking-[0.18em] text-beluga-champagne hover:border-beluga-gold hover:text-beluga-gold"
        >
          <ExternalLink size={12} /> Tester
        </a>
        <button
          type="button"
          onClick={downloadPng}
          disabled={!dataUrl}
          className="inline-flex items-center gap-1.5 border border-beluga-gold/30 px-3 py-1.5 font-raleway text-[0.65rem] uppercase tracking-[0.18em] text-beluga-champagne hover:border-beluga-gold hover:text-beluga-gold disabled:opacity-40"
        >
          <Download size={12} /> PNG
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-raleway text-[0.65rem] uppercase tracking-[0.18em] text-beluga-champagne/45 hover:text-beluga-gold"
          >
            Retirer
          </button>
        )}
      </div>
    </article>
  );
}
