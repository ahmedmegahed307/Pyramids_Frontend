import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { textProcessingRequest } from "../../services/AIService/AIService";
import { AITextProcessingRequest } from "../../models/Interfaces/AITextProcessingRequest";
import { useState } from "react";
import { useJobQueryStore } from "./AIjobQueryStore";
import { useNavigate } from "react-router-dom";
import { AICheckCreateJobInfoStore } from "./AICheckCreateJobInfoStore";

const useAITextProcessingRequest = () => {

  const navigate = useNavigate();
  //Notification Query
  const [responseData, setResponseData] = useState<any>(null);
  const jobQueryStore = useJobQueryStore();
  const checkCreateJobInfoStore  =AICheckCreateJobInfoStore();

  
  return useMutation<ResponseData, Error, AITextProcessingRequest>(
    async (request: AITextProcessingRequest): Promise<ResponseData> => {
      const response = await textProcessingRequest(request);
      setResponseData(response);
      return response;
      
    },
    {
      onSuccess: async (responseFromBackend) => {
        if (responseFromBackend.message == "CreateJobInfoCheck") {
          checkCreateJobInfoStore.setJobInfoResult(responseFromBackend.data);
          checkCreateJobInfoStore.setIsConfirmCreateJobPopUp(true);
         
        } else if (responseFromBackend.message == "JobQueryReport") {
          jobQueryStore.setIsAISearch(true);
          jobQueryStore.setJobQueryResult(responseFromBackend.data);
          navigate("/reports/jobQuery");
        }

      },
      onError: (error: any) => {
        Swal.fire({
          text: error.response.data.message || error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useAITextProcessingRequest;
