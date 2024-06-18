import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { countryService } from "../../services";
import { toast } from "../../lib/toast";
import { Division } from "../../types";
import { DivisionForm } from "./DivisionForm";

const EditCountryPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const [divisionDetail, setDivisionDetail] = useState<Division>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      countryService.getDivisionDetail(id!).then((res) => {
        if (res.result) {
          setDivisionDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onSubmit = async (value: any) => {
    const division = {
      divisionName: value.divisionName,
      divisionAbbreviation: value.divisionAbbreviation,
      divisionType: value.divisionType,
      countryName: value.countryName,
      status: value.status,
    };
    await countryService
      .editDivision(id!, division)
      .then((result) => {
        result && toast.success("Division is edited successfully");
        onBack();
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
        <DivisionForm onSubmit={onSubmit} division={divisionDetail} />
      </div>
    </div>
  );
};

export default EditCountryPage;
