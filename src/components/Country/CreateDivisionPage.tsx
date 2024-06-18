import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { countryService } from "../../services";
import { toast } from "../../lib/toast";
import { DivisionForm } from "./DivisionForm";

const CreateDivisionForm = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const onSubmit = async (value: any) => {
    try {
      const division = {
        divisionName: value.divisionName,
        divisionAbbreviation: value.divisionAbbreviation,
        divisionType: value.divisionType,
        countryName: value.countryName,
        status: value.status,
      };
      await countryService
        .createDivision(division)
        .then((result) => {
          result && toast.success("Division is created successfully");
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
        <DivisionForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CreateDivisionForm;
