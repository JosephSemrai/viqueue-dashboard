import "./styles.css";
import {
  Button,
  Page,
  Card,
  Row,
  Col,
  Text,
  useTheme,
  Capacity,
  Progress,
  Input,
  Note
} from "@geist-ui/react";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axiosInstance from "./axiosInstance";

const MAX_OCCUPANCY = 15;

const ExampleBlock = () => (
  <Card shadow>
    <h4>The Evil Rabbit</h4>
    <p>shadow card.</p>
  </Card>
);

export default function App() {
  const theme = useTheme();

  const QueueViewer = () => {
    const peopleCount = 10;
    const displayPercentage = peopleCount / MAX_OCCUPANCY;

    const colors = {
      20: theme.palette.error,
      40: theme.palette.warning,
      60: theme.palette.success,
      80: "#000"
    };

    return (
      <Card style={{ height: "100%" }}>
        {/* <Capacity
          value={displayPercentage}
          color={theme.palette.success}
          style={{ marginBottom: "15px" }}
        /> */}
        <h4>Your Queue</h4>
        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col bg-white overflow-hidden shadow rounded-lg">
              <div className="flex-grow px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    {/* Heroicon name: outline/users */}
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Queue Status
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {queueLength}
                      </div>

                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {/* <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg> */}
                        <span className="sr-only">Increased by</span>
                        waiting in queue
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {" "}
                    Manage Queue
                    <span className="sr-only"> Avg. Click Rate stats</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white overflow-hidden shadow rounded-lg">
              <div className="flex-grow px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    {/* Heroicon name: outline/mail-open */}
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Capacity Status
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {occupancy}
                      </div>

                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <svg
                          className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {MAX_OCCUPANCY - occupancy} spots left
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Progress value={displayPercentage} colors={colors} />
                </div>
              </div>
            </div>
          </dl>
        </div>

        <Note style={{ marginTop: "15px" }}>
          Although not recommended, you can manually exceed the capacity of the
          building.
        </Note>
      </Card>
    );
  };

  const [userUid, setUserUid] = useState("demo");
  const [queueId, setQueueId] = useState(95712);

  const [occupancy, setOccupancy] = useState(0);
  const [queueLength, setQueueLength] = useState(0);

  const addCustomer = async () => {
    try {
      const { data } = await axiosInstance.get("/ticket-actions", {
        params: {
          queue_id: queueId
        }
      });

      alert(data.curr_occupancy);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  const removeCustomer = async () => {
    try {
      const { data } = await axiosInstance.delete(`/notif/${queueId}`);

      alert(data.curr_occupancy);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  useEffect(() => {
    refreshOccupancyAndQueueLength();
  }, [queueId]);

  const refreshOccupancyAndQueueLength = () => {
    console.log("Getting occupancy and queue");

    axiosInstance
      .get(`/occupancy/${queueId}`)
      .then((res) => {
        console.log("Occupancy", res.data);
        setOccupancy(res.data);
      })
      .catch((e) => console.log("Error getting occupancy:", JSON.stringify(e)));

    axiosInstance
      .post(`/occupancy/${queueId}`)
      .then((res) => {
        console.log("Queue Length", res.data);
        setQueueLength(res.data);
      })
      .catch((e) =>
        console.log("Error getting queue length:", JSON.stringify(e))
      );
  };

  return (
    <>
      <Header />

      <Page size="medium">
        <Page.Content>
          <Row justify="space-between">
            {" "}
            <h3 style={{ marginLeft: "15px" }}>Dashboard</h3>
            <Input
              label="Queue ID"
              value={queueId}
              onChange={(e) => setQueueId(e.target.value)}
            />
          </Row>

          <Row gap={0.8} style={{ marginBottom: "15px" }}>
            <Col>
              <Row style={{ marginBottom: "15px" }}>
                <Card onClick={addCustomer} shadow type="success">
                  <h4>Add Customer</h4>

                  <Text>Press this if someone just entered the building.</Text>
                </Card>
              </Row>
              <Row>
                <Card onClick={removeCustomer} shadow type="cyan">
                  <h4>Remove Customer</h4>

                  <Text>Press this if someone has left the building.</Text>
                </Card>
              </Row>
            </Col>

            <Col span={60}>
              <QueueViewer />
            </Col>
          </Row>
          {/* <Row gap={0.8}>
            <Col>
              <ExampleBlock />
            </Col>
            <Col>
              <ExampleBlock />
            </Col>
            <Col>
              <ExampleBlock />
            </Col>
          </Row> */}
        </Page.Content>
        <Page.Footer>
          <Footer />
        </Page.Footer>
      </Page>
    </>
  );
}
