export const authConfig = () => ({
  access: String(process.env.ACCESS),
  refresh: String(process.env.REFRESH),
});
