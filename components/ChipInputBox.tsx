import { useEffect } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import ChipInput from './ChipInput';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from './ui/Form';
import { QuestionPayload } from '@/lib/validators/question';

interface InputBoxProps {
  title: string;
  description: string;
  placeholder: string;
  name: 'tags';
  form: UseFormReturn<QuestionPayload, any, QuestionPayload>;
  isLoading: boolean;
}

const InputBox = ({
  title,
  description,
  placeholder,
  name,
  form,
  isLoading,
}: InputBoxProps) => {
  const { control, setValue } = form;

  useEffect(() => {
    // Set the initial value when the component mounts
    setValue(name, []);
  }, [name, setValue]);

  return (
    <div className="border border-zinc-200 bg-white p-6 rounded-sm max-w-4xl">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel
              children={
                <>
                  <h3 className="font-bold text-zinc-800 text-base">{title}</h3>
                  <p className="text-[13px] text-zinc-600 mt-1">{description}</p>
                </>
              }
            />
            <FormControl>
              <ChipInput
                {...field}
                placeholder={placeholder}
                disabled={isLoading}
                onChange={(chips) => setValue(name, chips)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputBox;
