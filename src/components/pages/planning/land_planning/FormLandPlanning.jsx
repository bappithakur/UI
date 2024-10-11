import { useSelector } from "react-redux";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import { CropService } from "../../../../core/services/CropService";
import { BusinessService } from "../../../../core/services/BusinessService";
import { LandService } from "../../../../core/services";
import { showMessage } from "../../../../core/helpers/Notification";

const FormLandPlanning = ({ onClose, onSuccess, planId }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [optionCropPlan, setOptionCropPlan] = useState([]);
  const [optionsCropCycle, setOptionsCropCycle] = useState([]);
  const [optionsCropCycleArea, setOptionsCropCycleArea] = useState([]);
  const [data, setData] = useState({ planList: [], cropCycleAreaList: [] });
  let landArea = 0;
  // const formFields = [
  //   "landType",
  //   "landArea",
  //   "landAreaUom",
  //   "stdYield",
  //   "qty",
  //   "yieldPerLandArea",
  //   "landPlanned",
  //   "totalRequirement",
  // ];

  const {
    user: { countryid },
  } = useSelector((state) => state.authReducer);

  const onFinish = async (param) => {
    setLoading(true);

    const stateId = parseInt(param.crCropCycleAreaId.split("-")[0]);

    const tempPlan = data.planList.filter(
      (ele) => ele.ppPlanLineId === param.ppPlanLineId
    );

    const tempCropCycleArea = data.cropCycleAreaList.filter(
      (ele) => ele.crCropCycleAreaId === stateId
    );

    param.ppPlanLandId = 0;
    param.ppPlanId = planId;
    param.ddCountryId = countryid;
    param.crCropId = tempPlan[0].crCropId;
    param.ddStateId = tempCropCycleArea[0].stateId;
    param.crCropCycleAreaId = stateId;
    param.crCropVarietyId = tempPlan[0].crCropVarietyId;
    param.crCropCycleId = tempCropCycleArea[0].crCropCycleId;
    param.ppPlanLinesCycleId = param.ppPlanLinesCycleId.split("-")[0];
    param.landArea = landArea;

    if (
      parseFloat(param.totalRequirement) >
        parseFloat(param.landArea) - parseFloat(param.landPlanned) ||
      parseFloat(param.totalRequirement) <= 0
    ) {
      showMessage(
        "Required land should be less than the difference of land area and land utilized!",
        400
      );

      setLoading(false);
      return;
    }

    const response = await LandService.createPlanLand(param);

    if (response) {
      form.resetFields();
      getCropPlanList();
      onClose(true);
      onSuccess(response);
    }

    setLoading(false);
  };

  const onCropCycleAreaChange = async (value) => {
    //form.resetFields(formFields);
  };

  const onCropCycleChange = async (value) => {
    const response = await CropService.getCropCycleAreaList(
      value.split("-").pop()
    );

    if (response) {
      setData((prev) => {
        return { ...prev, cropCycleAreaList: response };
      });

      const list = response.map((el) => {
        return {
          label: el.stateName,
          value: `${el.crCropCycleAreaId}-${el.zoneId}-${el.stateId}`,
        };
      });

      setOptionsCropCycleArea(list);

      //form.resetFields([...formFields, "crCropCycleAreaId"]);
    }
  };

  const onCropPlanChange = async (value) => {
    const response = await BusinessService.getBusinessPlanLineCycleList(value);

    const list = response.map((el) => {
      return {
        label: el.cropCycle,
        value: `${el.ppPlanLinesCycleId}-${el.crCropCycleId}`,
      };
    });

    setOptionsCropCycle(list);
    // form.resetFields([
    //   ...formFields,
    //   "ppPlanLinesCycleId",
    //   "crCropCycleAreaId",
    // ]);
    let quantity = data.planList.filter((pl) => pl.ppPlanLineId === value)[0]
      .qty;
    form.setFieldValue("qty", quantity);
  };

  const getCropPlanList = useCallback(async () => {
    // const response = await BusinessService.getBusinessPlanLineList(planId);
    const response = await BusinessService.getBussinessPlanLineWithQuantityList(
      planId
    );

    if (response) {
      setData((prev) => {
        return { ...prev, planList: response };
      });

      const list = response.map((el) => {
        return {
          label: `${el.crop} - ${el.variety}`,
          value: el.ppPlanLineId,
        };
      });

      setOptionCropPlan(list);
    }
  }, [planId]);

  const onLandTypeChange = async () => {
    const stateArr = form.getFieldValue("crCropCycleAreaId").split("-");
    const stateId = stateArr[2];
    const zoneId = stateArr[1];
    const landType = form.getFieldValue("landType");
    if (countryid && stateId && landType) {
      const response = await LandService.getLandArea(
        countryid,
        zoneId,
        stateId,
        landType
      );
      console.log(response);
      form.setFieldValue("landArea", response?.landArea ?? 0);
      landArea = response.landArea;
    }
    if (planId && stateId && landType) {
      const response = await BusinessService.getUsedLandFromBusinessPlanCycle(
        planId,
        stateId,
        landType
      );
      form.setFieldValue(
        "landPlanned",
        response?.usedLandinBusinessPlanCount ?? 0
      );
    }
  };

  const getYieldFromCropVarietyState = async (e) => {
    if (e.target.value) {
      const stateId =
        form.getFieldValue("crCropCycleAreaId")?.split("-")[2] ?? 0;
      const tempPlan = data.planList.filter(
        (ele) => ele.ppPlanLineId === form.getFieldValue("ppPlanLineId")
      );
      if (stateId > 0 && tempPlan.length > 0) {
        let response = await CropService.getYieldFromCropVarietyState(
          tempPlan[0].crCropId,
          tempPlan[0].crCropVarietyId,
          stateId
        );
        let expectedYieldTotal = e.target.value * (response?.yield ?? 0);
        let unAllocatedYieldTotal =
          (form.getFieldValue("qty") ?? 0) - expectedYieldTotal;

        // setting form values
        form.setFieldValue("stdYield", expectedYieldTotal);
        form.setFieldValue("yieldPerLandArea", response?.yield ?? 0);
        form.setFieldValue("expectedYield", expectedYieldTotal);
        form.setFieldValue("unAllocatedYield", unAllocatedYieldTotal);
      }
    }
  };
  useEffect(() => {
    getCropPlanList();
  }, [getCropPlanList]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      hideRequiredMark
      initialValues={{
        landAreaUom: 0,
        stdYield: 0,
        yieldPerLandArea: 0,
        landPlanned: 0,
        totalRequirement: 0,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ppPlanLineId" label="Crop Plan">
            <Select
              title="cropPlan"
              onChange={onCropPlanChange}
              options={optionCropPlan}
              placeholder="Please select an crop plan"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="ppPlanLinesCycleId" label="Crop Cycle">
            <Select
              title="cropCycle"
              onChange={onCropCycleChange}
              options={optionsCropCycle}
              placeholder="Please select an crop cycle"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="qty" label="Plan Quantity">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="crCropCycleAreaId" label="State">
            <Select
              title="cropCycleArea"
              onChange={onCropCycleAreaChange}
              options={optionsCropCycleArea}
              placeholder="Please select an crop cycle area"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landType" label="Land Type">
            <Select
              onChange={onLandTypeChange}
              placeholder="Please Select Land Type"
            >
              <Select.Option value={""}>Please Select Land Type</Select.Option>
              <Select.Option value="10">Own Land</Select.Option>
              <Select.Option value="20">Contract Land</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landArea" label="Land Area">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landPlanned" label="Land Utilized">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="landAreaUom" label="Land UOM">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="totalRequirement"
            label="Required Land"
            onBlur={getYieldFromCropVarietyState}
            rules={[
              { required: true, message: "Please required land" },
              {
                pattern: new RegExp("^\\d+(\\.\\d+)*$"),
                message: "Only numbers (including decimals) are allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="expectedYield" label="Expected Yield">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="unAllocatedYield" label="Unallocated Yield">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="stdYield" label="Std. Yield">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item name="yieldPerLandArea" label="Yield Per Land Area">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Button loading={loading} htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormLandPlanning;
