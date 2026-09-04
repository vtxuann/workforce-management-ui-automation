function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Environment variable "${name}" must be defined.`,
    );
  }

  return value;
}

export const env = {
  adminUsername: requireEnv('ADMIN_USERNAME'),
  adminPassword: requireEnv('ADMIN_PASSWORD'),
};