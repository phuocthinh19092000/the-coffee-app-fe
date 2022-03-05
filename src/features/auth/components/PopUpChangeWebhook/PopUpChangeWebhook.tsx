import useDebounce from '../../../../Hook/useDebounce';
import { useForm, SubmitHandler } from 'react-hook-form';
import './PopUpChangeWebhook.css';

type Inputs = {
  webHook: string;
};

type Props = {
  webHook?: string | '';
};

const PopUpChangeWebhook = (props: Props) => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const inputFieldWebHook = watch('webHook');

  const debouncedValueWebhook = useDebounce(inputFieldWebHook, 500);

  const isDisabledButton = debouncedValueWebhook && debouncedValueWebhook !== props.webHook;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO: CALL API UPDATE WEBHOOK HERE WITH "data" PARAMETER
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-change-webhook">
        <div className="card-change-webhook-center">
          <div className="card-change-webhook__title">
            <p className="text-style-customer-h1 text-brown">Change Webhook</p>
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
          <input
            className="card-change-webhook__input"
            placeholder="Enter your webhook"
            {...register('webHook', { required: true })}
            defaultValue={props.webHook || ''}
          ></input>
        </div>
        <button
          type="submit"
          disabled={!isDisabledButton}
          className={`card-change-webhook__button ${isDisabledButton ? 'bg-accent-1' : 'bg-accent-3'}`}
        >
          SAVE WEBHOOK
        </button>
      </div>
    </form>
  );
};

export default PopUpChangeWebhook;
