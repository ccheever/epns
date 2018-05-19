import Joi from 'joi';

let _messageSchema = Joi.object().keys({
  to: Joi.string().required(),
  data: Joi.object(),
  body: Joi.string().allow(''),
  sound: Joi.any().valid('default', null),
  ttl: Joi.number()
    .min(0)
    .max(2419200),
  expiration: Joi.number().min(0),
  priority: Joi.string()
    .valid('default', 'normal', 'high')
    .default('default'),
  loadingScreen: Joi.object().keys({
    iconUrl: Joi.string(),
    exponentIconColor: Joi.string().valid('white', 'blue'),
    exponentIconGrayscale: Joi.boolean(),
    backgroundImageUrl: Joi.string(),
    backgroundColor: Joi.string(),
  }),

  // Android
  title: Joi.string(),
  icon: Joi.string(),
  color: Joi.string().regex(/^#[\da-f]{6}$/, 'color'),
  _tag: Joi.string(),
  _selectAction: Joi.string(),

  // iOS
  badge: Joi.number(),
  _category: Joi.string(),
  _threadId: Joi.string(),
  _collapseId: Joi.string(),
  _contentAvailable: Joi.boolean(),
  _mutableContent: Joi.boolean(),
  _launchImage: Joi.string(),
});

let _sendSchema = Joi.alternatives().try(_messageSchema, Joi.array().items(_messageSchema));

export default function validateMessage(msg) {
  let { error, value } = Joi.validate(msg, _messageSchema, {
    stripUnknown: { objects: true },
  });
  if (error) {
    error._ApiValidationError = true;
    throw error;
  }
  return value;
}


