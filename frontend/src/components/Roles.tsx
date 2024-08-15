interface RolesProps {
  roles: string[];
}

export function Roles({ roles }: RolesProps) {
  return (
    <div className="w-full h-full tewxt-sm">
      <p>Roles</p>
      <ul className="flex flex-wrap w-full gap-1">
        {roles.map((role, idx) => (
          <li
            className="px-1 text-xs rounded-sm bg-secondary"
            key={`role-${idx}-${role}`}
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}
