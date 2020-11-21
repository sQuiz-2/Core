import { validator } from '@ioc:Adonis/Core/Validator';

validator.rule(
  'enumNumber',
  (value, [options], { pointer, arrayExpressionPointer, errorReporter }) => {
    /**
     * Skip validation when value is not a number. The number
     * schema rule will handle it
     */
    if (typeof value !== 'number') {
      return;
    }

    /**
     * Report error when the enum doesn't contain the value
     */
    if (!options.includes(value)) {
      errorReporter.report(
        pointer,
        'enumNumber',
        "The enum doesn't contain this value",
        arrayExpressionPointer,
      );
    }
  },
);
