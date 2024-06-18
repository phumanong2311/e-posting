import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { countryService } from "../../services";
import { toast } from "../../lib/toast";
import { City } from "../../types";
import { CityForm } from "./CityForm";

const EditCityPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const [cityDetail, setCityDetail] = useState<City>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      countryService.getCityDetail(id!).then((res) => {
        if (res.result) {
          setCityDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onSubmit = async (value: any) => {
    const city = {
      divisionName: value.divisionName,
      divisionAbbreviation: value.divisionAbbreviation,
      cityName: value.cityName,
      countryName: value.countryName,
      status: value.status,
    };
    await countryService
      .editCity(id!, city)
      .then((result) => {
        result && toast.success("City is edited successfully");
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
        <CityForm onSubmit={onSubmit} city={cityDetail} />
      </div>
    </div>
  );
};

export default EditCityPage;
