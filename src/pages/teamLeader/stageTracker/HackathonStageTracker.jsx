import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialStageDetails,
  saveInitialStageDetails,
  getFinalStageDetails,
  saveFinalStageDetails,
  getWinnerDetails,
  saveWinnerDetails,
  resetSaveInitialStageSuccess,
  resetSaveFinalStageSuccess,
  resetSaveWinnerStageSuccess,
} from "../../../redux/features/compDetails/competitionSlice";
import { Button, Form } from "react-bootstrap";

const HackathonStageTracker = () => {
  const dispatch = useDispatch();
  const {
    initialStage,
    finalStage,
    winnerStage,
    saveInitialStageSuccess,
    saveFinalStageSuccess,
    saveWinnerStageSuccess,
  } = useSelector((state) => state.competition);

  const [abstract, setAbstract] = useState("");
  const [pptFile, setPptFile] = useState(null);
  const [finalRoundStatus, setFinalRoundStatus] = useState(null);
  const [finalPpt, setFinalPpt] = useState(null);
  const [teamPhoto, setTeamPhoto] = useState(null);
  const [location, setLocation] = useState({ college: "", city: "" });
  const [mediaCoverage, setMediaCoverage] = useState(null);
  const [winnerStatus, setWinnerStatus] = useState(null);
  const [rank, setRank] = useState("");
  const [prizeMoney, setPrizeMoney] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [medal, setMedal] = useState(null);
  const [winnerPhoto, setWinnerPhoto] = useState(null);

  useEffect(() => {
    dispatch(getInitialStageDetails());
    dispatch(getFinalStageDetails());
    dispatch(getWinnerDetails());
  }, [dispatch]);

  useEffect(() => {
    if (initialStage) {
      setAbstract(initialStage.abstract || "");
      setFinalRoundStatus(initialStage.finalRoundStatus || null);
    }
    if (finalStage) {
      setLocation({
        college: finalStage.college || "",
        city: finalStage.city || "",
      });
      setWinnerStatus(finalStage.winnerStatus || null);
    }
    if (winnerStage) {
      setRank(winnerStage.rank || "");
    }
  }, [initialStage, finalStage, winnerStage]);

  useEffect(() => {
    if (saveInitialStageSuccess) {
      toast.success("Initial stage saved!");
      dispatch(resetSaveInitialStageSuccess());
    }
  }, [saveInitialStageSuccess, dispatch]);

  useEffect(() => {
    if (saveFinalStageSuccess) {
      toast.success("Final stage saved!");
      dispatch(resetSaveFinalStageSuccess());
    }
  }, [saveFinalStageSuccess, dispatch]);

  useEffect(() => {
    if (saveWinnerStageSuccess) {
      toast.success("Winner details saved!");
      dispatch(resetSaveWinnerStageSuccess());
    }
  }, [saveWinnerStageSuccess, dispatch]);

  const handleFileChange = (setter) => (e) => setter(e.target.files[0]);

  const handleDeselect = (setFile) => () => {
    setFile(null);
    document.querySelector('input[type="file"]').value = "";
  };

  const handleInitialSave = () => {
    const formData = new FormData();
    formData.append("abstract", abstract);
    if (pptFile) formData.append("ppt", pptFile);
    formData.append("finalRoundStatus", finalRoundStatus);
    dispatch(saveInitialStageDetails(formData));
  };

  const handleFinalSave = () => {
    const formData = new FormData();
    if (finalPpt) formData.append("finalPpt", finalPpt);
    if (teamPhoto) formData.append("teamPhoto", teamPhoto);
    formData.append("college", location.college);
    formData.append("city", location.city);
    if (mediaCoverage) formData.append("mediaCoverage", mediaCoverage);
    formData.append("winnerStatus", winnerStatus);
    dispatch(saveFinalStageDetails(formData));
  };

  const handleWinnerSave = () => {
    const formData = new FormData();
    formData.append("rank", rank);
    if (prizeMoney) formData.append("prizeMoney", prizeMoney);
    if (certificate) formData.append("certificate", certificate);
    if (medal) formData.append("medal", medal);
    if (winnerPhoto) formData.append("teamPhoto", winnerPhoto);
    dispatch(saveWinnerDetails(formData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Competition Progress Tracker
      </h2>

      {/* Initial Stage */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Initial Stage Details</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Team Name:</Form.Label>
            <Form.Control
              type="text"
              value={initialStage.teamName || ""}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Abstract:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>PPT:</Form.Label>
            <Form.Control
              type="file"
              name="pptFile"
              accept=".pptx,.doc,.docx"
              onChange={handleFileChange(setPptFile)}
              required
            />
            {pptFile && (
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <small className="text-muted">{pptFile.name}</small>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={handleDeselect(setPptFile)}
                >
                  Remove
                </Button>
              </div>
            )}
          </Form.Group>

          <Button variant="primary" onClick={handleInitialSave}>
            Save Initial Stage
          </Button>
        </Form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
        {/* Final Round Selection */}
        <Form className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label className="text-lg ml-70 pb-6">Final Round Selection:</Form.Label>
            <div className="d-flex gap-20 ml-55">
              <Form.Check
                type="radio"
                label="Selected"
                name="finalRound"
                value="Selected"
                checked={finalRoundStatus === "Selected"}
                onChange={() => setFinalRoundStatus("Selected")}
              />
              <Form.Check
                type="radio"
                label="Not Selected"
                name="finalRound"
                value="Not Selected"
                checked={finalRoundStatus === "Not Selected"}
                onChange={() => setFinalRoundStatus("Not Selected")}
              />
            </div>
          </Form.Group>
        </Form>
      </div>

      {/* Final Stage */}
      {finalRoundStatus === "Selected" && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Final Stage Details</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Final PPT:</Form.Label>
                <Form.Control
                  type="file"
                  name="finalPpt"
                  accept=".pptx,.doc,.docx"
                  onChange={handleFileChange(setFinalPpt)}
                  required
                />
                {finalPpt && (
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <small className="text-muted">{finalPpt.name}</small>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={handleDeselect(setFinalPpt)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Team Photo:</Form.Label>
                <Form.Control
                  type="file"
                  name="teamPhoto"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange(setTeamPhoto)}
                  required
                />
                {teamPhoto && (
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <small className="text-muted">{teamPhoto.name}</small>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={handleDeselect(setTeamPhoto)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hackathon College/Institute Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={location.college}
                  onChange={(e) =>
                    setLocation({ ...location, college: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hackathon City Location:</Form.Label>
                <Form.Control
                  type="text"
                  value={location.city}
                  onChange={(e) =>
                    setLocation({ ...location, city: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Media Coverage:</Form.Label>
                <Form.Control
                  type="file"
                  name="mediaCoverage"
                  accept="image/*"
                  onChange={handleFileChange(setMediaCoverage)}
                />
                {mediaCoverage && (
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <small className="text-muted">{mediaCoverage.name}</small>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={handleDeselect(setMediaCoverage)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" onClick={handleFinalSave}>
                Save Final Stage
              </Button>
            </Form>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-lg ml-70 pb-6">Winner Status:</Form.Label>
                <div className="d-flex gap-20 ml-55">
                  <Form.Check
                    type="radio"
                    label="Winner"
                    name="winnerStatus"
                    value="Winner"
                    checked={winnerStatus === "Winner"}
                    onChange={() => setWinnerStatus("Winner")}
                  />
                  <Form.Check
                    type="radio"
                    label="Not Winner"
                    name="winnerStatus"
                    value="Not Winner"
                    checked={winnerStatus === "Not Winner"}
                    onChange={() => setWinnerStatus("Not Winner")}
                  />
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      )}

      {/* Winner Stage */}
      {winnerStatus === "Winner" && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Winner Stage Details</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Rank:</Form.Label>
              <Form.Control
                as="select"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                required
              >
                <option value="">Select Rank</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prize Money:</Form.Label>
              <Form.Control
                type="file"
                name="prizeMoney"
                accept=".pdf,.jpg,.jpeg"
                onChange={handleFileChange(setPrizeMoney)}
              />
              {prizeMoney && (
                <div className="mt-2 d-flex justify-content-between align-items-center">
                  <small className="text-muted">{prizeMoney.name}</small>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={handleDeselect(setPrizeMoney)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Certificate:</Form.Label>
              <Form.Control
                type="file"
                name="certificate"
                accept=".pdf,.jpg,.jpeg"
                onChange={handleFileChange(setCertificate)}
              />
              {certificate && (
                <div className="mt-2 d-flex justify-content-between align-items-center">
                  <small className="text-muted">{certificate.name}</small>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={handleDeselect(setCertificate)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Medal:</Form.Label>
              <Form.Control
                type="file"
                name="medal"
                accept=".jpg,.jpeg"
                onChange={handleFileChange(setMedal)}
              />
              {medal && (
                <div className="mt-2 d-flex justify-content-between align-items-center">
                  <small className="text-muted">{medal.name}</small>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={handleDeselect(setMedal)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Winner Team Photo:</Form.Label>
              <Form.Control
                type="file"
                name="winnerPhoto"
                accept=".jpg,.jpeg"
                onChange={handleFileChange(setWinnerPhoto)}
                required
              />
              {winnerPhoto && (
                <div className="mt-2 d-flex justify-content-between align-items-center">
                  <small className="text-muted">{winnerPhoto.name}</small>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={handleDeselect(setWinnerPhoto)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Form.Group>

            <Button variant="primary" onClick={handleWinnerSave}>
              Save Winner Details
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default HackathonStageTracker;
