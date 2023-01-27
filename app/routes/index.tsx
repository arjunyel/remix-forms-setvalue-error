import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "~/form-action.server";
import type { ActionFunction } from "@remix-run/node";
import { Form } from "~/form";
import CurrencyInput from "react-currency-input-field";

const schema = z.object({
	amount: z.string(),
});

const mutation = makeDomainFunction(schema)(
	async (values) =>
		console.log(values) /* or anything else, like saveMyValues(values) */
);

export const action: ActionFunction = async ({ request }) =>
	formAction({
		request,
		schema,
		mutation,
		// successPath: '/success', /* path to redirect on success */
	});

export default function Index() {
	return (
		<Form schema={schema}>
			{({ Field, Errors, Button, register, setValue }) => (
				<>
					<Field name="amount">
						{({ Label, Errors, value }) => (
							<>
								<Label />
								<CurrencyInput
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									prefix="$"
									disableAbbreviations={true}
									allowNegativeValue={false}
									decimalScale={2}
									intlConfig={{ locale: "en-US", currency: "USD" }}
									{...register("amount")}
									onValueChange={(value, name, values) => {
										console.log(value, name, values, values?.value);
										setValue("amount", values?.value || "", {
											shouldValidate: true,
										});
									}}
								/>
								<Errors />
							</>
						)}
					</Field>
					<Errors />
					<Button />
				</>
			)}
		</Form>
	);
}
