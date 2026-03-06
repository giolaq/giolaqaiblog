import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-sm text-term-red">
        bash: page: command not found
      </p>
      <h1 className="mt-4 text-4xl font-bold text-foreground">
        404
      </h1>
      <p className="mt-2 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-dashed border-border px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <span className="text-accent">$</span> cd ~
      </Link>
    </div>
  );
}
