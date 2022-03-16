import { FormProvider, useForm } from 'react-hook-form';
import './PopUpChangeWebhook.css';
import { selectWebhookData, updateWebhook } from '../../../webhook/action/webhook';
import { useSelector } from 'react-redux';
import { NotificationParams } from '../../../../interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../../../components/FormInput/FormInput';
import { NotificationType, PositionToast } from '../../../../enum';
import { useAppDispatch } from '../../../../storage/hooks';
import Card from '../../../../components/Card/Index';

type ChangeWebHookDto = {
  webHook: string;
};

const schemaChangeWebHook = yup.object().shape({
  webHook: yup.string().required('Webhook is required').url('Not a valid URL'),
});
type Props = {
  onClickClosePopUp: () => void;
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
};

const PopUpChangeWebhook = (props: Props) => {
  const dispatch = useAppDispatch();
  const webHook = useSelector(selectWebhookData);

  const methods = useForm<ChangeWebHookDto>({
    resolver: yupResolver(schemaChangeWebHook),
    mode: 'onChange',
    defaultValues: { webHook: webHook },
  });
  const { handleSubmit, formState } = methods;
  const { errors, isValid, dirtyFields } = formState;

  const onSubmit = (dataForm: ChangeWebHookDto) => {
    dispatch(updateWebhook({ webHook: dataForm.webHook }));
    props.onClickClosePopUp();
    props.setShowNotification({
      message: 'Webhook updated successfully!',
      type: NotificationType.SUCCESS,
      position: PositionToast.TOP_RIGHT,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="card card--right">
          <div className="flex flex-col h-full justify-evenly">
            <div className="card-change-webhook__title">
              <p className="text-style-1440-h1 text-brown">Notification Settings</p>
              <p className="card-change-webhook__description">
                Go to Google Chat &gt; Create Space &gt; Manage Webhook &gt; Create Webhook &gt; Copy URL
              </p>
              <p className="card-change-webhook__description">
                Or you can access&nbsp;
                <a
                  href="https://docs.google.com/presentation/d/1JD_liKMv_SjJLqMPEqHMnSdS-lM-6Yvlz_9dldThRRw/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-1"
                >
                  this link&nbsp;
                </a>
                and follow the instruction to extract your google chat hook.
              </p>
            </div>
            <FormInput name="webHook" placeholder="Enter your webhook" error={errors.webHook} />

            <button
              type="submit"
              disabled={!(isValid && dirtyFields.webHook)}
              className={`card-change-webhook__button ${
                isValid && dirtyFields.webHook ? 'bg-accent-1' : 'bg-accent-3'
              }`}
            >
              SAVE WEBHOOK
            </button>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
};

export default PopUpChangeWebhook;
