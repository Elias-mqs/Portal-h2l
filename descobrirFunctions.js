const handleSubmit = (onValid, onInvalid) => async (e) => {
    let onValidError = undefined;
    if (e) {
        e.preventDefault && e.preventDefault();
        e.persist && e.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
        isSubmitting: true,
    });
    if (_options.resolver) {
        const { errors, values } = await _executeSchema();
        _formState.errors = errors;
        fieldValues = values;
    } else {
        await executeBuiltInValidation(_fields);
    }
    unset(_formState.errors, 'root');
    if (isEmptyObject(_formState.errors)) {
        _subjects.state.next({
            errors: {},
        });
        try {
            await onValid(fieldValues, e);
        } catch (error) {
            onValidError = error;
        }
    } else {
        if (onInvalid) {
            await onInvalid({
                ..._formState.errors
            }, e);
        }
        _focusError();
        setTimeout(_focusError);
    }
    _subjects.state.next({
        isSubmitted: true,
        isSubmitting: false,
        isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
        submitCount: _formState.submitCount + 1,
        errors: _formState.errors,
    });
    if (onValidError) {
        throw onValidError;
    }
}
    ;