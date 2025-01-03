import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { uid } from 'uid';
import { IconInfoCircle } from '@tabler/icons-react';
import './switch.scss';
import { tooltipID } from '@/utils';
import { PlacesType } from 'react-tooltip';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  hideLabel?: boolean;
  customLabel?: string;
  tooltipMessage?: string;
  tooltipPosition?: PlacesType;
}

export const Switch = ({
  label,
  hideLabel = false,
  customLabel,
  tooltipMessage,
  tooltipPosition = 'top',
  ...rest
}: Props) => {
  const id = uid();
  const { t } = useTranslation();

  return (
    <div className="switch">
      <label className="control" htmlFor={id} />
      <input type="checkbox" id={id} {...rest} />
      <div className="switch_labelBox">
        {!hideLabel && (
          <label className="label" htmlFor={id}>
            {customLabel || t(label)}
          </label>
        )}
        {tooltipMessage && (
          <div
            className="switch_tooltipBox"
            data-tooltip-id={tooltipID}
            data-tooltip-html={tooltipMessage}
            data-tooltip-place={tooltipPosition}
          >
            <IconInfoCircle />
          </div>
        )}
      </div>
    </div>
  );
};
