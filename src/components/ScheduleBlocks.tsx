import { Card, CardContent } from "@/components/ui/card";
import { PortableText } from "@portabletext/react";
import type { ScheduleBlock } from "@/lib/sanityQueries";

interface ScheduleBlocksProps {
  blocks: ScheduleBlock[] | undefined;
}

function ScheduleBlockRenderer({ block }: { block: ScheduleBlock }) {
  const title = block.blockTitle;

  if (block._type === "scheduleBlockProgramOptions") {
    const optsBlock = block as import("@/lib/sanityQueries").ScheduleBlockProgramOptions;
    return (
      <div>
        {title && <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{title}</h3>}
        {optsBlock.richText && optsBlock.richText.length > 0 && (
          <div className="prose prose-sm max-w-none prose-p:text-muted-foreground prose-headings:text-foreground mb-4">
            <PortableText value={optsBlock.richText} />
          </div>
        )}
        {optsBlock.options?.length ? (
          <div className="flex flex-wrap gap-3">
            {optsBlock.options.map((opt, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-muted/50 border border-border/50 min-w-[200px]"
              >
                <span className="text-foreground font-medium">{opt.label}</span>
                {opt.price && <span className="text-primary font-semibold">{opt.price}</span>}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (block._type === "scheduleBlockSimpleSchedule") {
    return (
      <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
        {title && <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{title}</h3>}
        <div className="space-y-1">
          {(block.days || block.time) && (
            <p className="text-foreground font-medium">
              {[block.days, block.time].filter(Boolean).join(" • ")}
            </p>
          )}
          {block.additionalNote && <p className="text-muted-foreground text-sm">{block.additionalNote}</p>}
        </div>
      </div>
    );
  }

  if (block._type === "scheduleBlockPricingTable" && block.rows?.length) {
    return (
      <div>
        {title && <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{title}</h3>}
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                  <td className="px-4 py-3 text-foreground">{row.description}</td>
                  <td className="px-4 py-3 text-primary font-semibold text-right whitespace-nowrap">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (block._type === "scheduleBlockSimplePricing" && block.items?.length) {
    return (
      <div>
        {title && <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{title}</h3>}
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg bg-muted/50 border border-border/50">
              <span className="text-foreground">{item.label}</span>
              <span className="text-primary font-semibold">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block._type === "scheduleBlockTimeSlotGrid" && block.slots?.length) {
    return (
      <div>
        {title && <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{title}</h3>}
        <div className="grid sm:grid-cols-2 gap-3">
          {block.slots.map((slot, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {slot.day && <p className="font-medium text-foreground">{slot.day}</p>}
                    {slot.time && <p className="text-muted-foreground text-sm">{slot.time}</p>}
                    {slot.optionalLabel && <p className="text-xs text-primary mt-1">{slot.optionalLabel}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function ScheduleBlocks({ blocks }: ScheduleBlocksProps) {
  if (!blocks?.length) return null;
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <ScheduleBlockRenderer key={block._key ?? i} block={block} />
      ))}
    </div>
  );
}
