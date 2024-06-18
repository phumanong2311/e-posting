import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { countryService } from "../../services";
import { toast } from "../../lib/toast";
import { CountryForm } from "./CountryForm";

const CreateCountryPage = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const onSubmit = async (value: any) => {
    try {
      const country = {
        countryName: value.countryName,
        status: value.status,
      };
      await countryService
        .createCountry(country)
        .then((result) => {
          result && toast.success("Country is created successfully");
          onBack();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <CountryForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CreateCountryPage;
