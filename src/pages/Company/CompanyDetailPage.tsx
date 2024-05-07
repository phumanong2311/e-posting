import { Image } from "@mantine/core";
import { IconChevronLeft, IconPencil } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { companyService } from "../../services";
import { Company, paths } from "../../types";
import { InformationField } from "../../ui";

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyDetail, setCompanyDetail] = useState<Company>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      companyService.getCompanyDetail(id!).then((res) => {
        if (res.result) {
          setCompanyDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onBack = () => {
    navigate(-1);
  };

  const onEdit = () => {
    navigate(`/${paths.ROOT}/${paths.EDIT_COMPANY}/${companyDetail!._id}`);
  };

  if (!companyDetail) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Company Logo:
            </p>
            <Image
              src={companyDetail!.logo}
              w={80}
              h={80}
              className="ml-3"
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
          </div>
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
            </>
          </div>
        </div>
        <InformationField
          label="Company Name: "
          value={companyDetail.companyName && companyDetail.companyName}
        />
        <InformationField
          label="City: "
          value={companyDetail.city && companyDetail.city}
        />
        <InformationField
          label="State: "
          value={companyDetail.state && companyDetail.state}
        />
        <InformationField
          label="Country: "
          value={companyDetail.country && companyDetail.country}
        />
        <InformationField
          label="Address: "
          value={companyDetail.address && companyDetail.address}
        />
        <InformationField
          label="Postal Code: "
          value={companyDetail.postalCode && companyDetail.postalCode}
        />
        <InformationField
          label="Website: "
          value={companyDetail.website && companyDetail.website}
        />
        <InformationField
          label="Ticker: "
          value={companyDetail.ticker && companyDetail.ticker}
        />
        <InformationField
          label="Company CEO: "
          value={companyDetail.companyCeo && companyDetail.companyCeo}
        />
        <InformationField
          label="Sector: "
          value={companyDetail.sector && companyDetail.sector}
        />
        <InformationField
          label="Industry: "
          value={companyDetail.industry && companyDetail.industry}
        />
        <InformationField
          label="Record Status: "
          value={companyDetail.companyStatus ? companyDetail.companyStatus : ""}
        />
      </div>
    </div>
  );
};

export default CompanyDetailPage;
