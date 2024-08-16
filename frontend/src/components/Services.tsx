interface ServicesProps {
  services: { database: boolean; redis: boolean };
}

export function Services({ services }: ServicesProps) {
  return (
    <div className="w-full h-full text-sm">
      <p>Services</p>
      <div className="px-2 py-1">
        <div className="flex items-center gap-2">
          <span className="text-xs">Database</span>
          <span>{services.database ? "✅" : "❌"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Redis</span>
          <span>{services.redis ? "✅" : "❌"}</span>
        </div>
      </div>
    </div>
  );
}
