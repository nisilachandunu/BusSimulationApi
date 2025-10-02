import Joi from "joi";

export const busValidationSchema = Joi.object({
  regNo: Joi.string().trim().required(),
  operator: Joi.string().trim().required(),
  routeCode: Joi.string().trim().required(),
  status: Joi.string().valid("on-duty", "off-duty", "maintenance").optional(),
  location: Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    updatedAt: Joi.date().optional(),
  }).required()
});

export const busUpdateValidationSchema = busValidationSchema.fork(
  ["regNo", "operator", "routeCode", "status", "location"],
  (field) => field.optional()
); 