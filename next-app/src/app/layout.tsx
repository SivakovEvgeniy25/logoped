import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Звуковые острова — логопедическая игра",
  description:
    "Аркадная игра для пошаговой отработки звукопроизношения: переднеязычные, среднеязычные и заднеязычные звуки, твёрдые и мягкие пары.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
