export const log = async (resolve, parent, args, ctx, info) => {
  try {
    const res = await resolve();
    return res;
  } catch (e) {
    console.log(e);
  }
};
