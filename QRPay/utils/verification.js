import ReactNativeBiometrics from 'react-native-biometrics';
const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const verify = (onSuccess, onFailure, onCancel) => {
  rnBiometrics
    .simplePrompt({
      promptMessage: 'Confirm payment',
    })
    .then(resultObject => {
      const {success} = resultObject;
      if (success) {
        onSuccess();
      } else {
        onCancel();
      }
    })
    .catch(() => {
      onFailure();
    });
};
