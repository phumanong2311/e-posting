import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { countryService } from "../../services";
import { toast } from "../../lib/toast";
import { Country } from "../../types";
import { CountryForm } from "./CountryForm";

const EditCountryPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const [countryDetail, setCountryDetail] = useState<Country>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      countryService.getCountryDetail(id!).then((res) => {
        if (res.result) {
          setCountryDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onSubmit = async (value: any) => {
    const country = {
      countryName: value.countryName,
      status: value.status,
    };
    await countryService
      .editCountry(id!, country)
      .then((result) => {
        result && toast.success("Country is edited successfully");
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
        <CountryForm onSubmit={onSubmit} country={countryDetail} />
      </div>
    </div>
  );
};

export default EditCountryPage;
