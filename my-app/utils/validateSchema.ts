/**
 * Function to validate data against a Zod schema.
 * @param schema The Zod schema to validate against.
 * @param data The data to validate. 
 * @returns An object containing a boolean `result` indicating if there are errors, and an `errors` object with validation error messages.
 * If `result` is true, `errors` will contain the validation errors.
 * If `result` is false, `errors` will be an empty object. 
 */
export const validateSchema = (schema: any, data: any) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors: any = {};
    result.error.errors.forEach((err: any) => {
      if (err.path[0]) errors[err.path[0]] = err.message;
    });
    return { result: true, errors: errors};
  }
  return {result: false, errors: {}};
};
