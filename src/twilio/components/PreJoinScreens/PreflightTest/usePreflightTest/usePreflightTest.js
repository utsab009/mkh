import { PreflightTestReport, PreflightTest } from '../../../../types';
import { TEST_DURATION } from '../PreflightTest';
import Video from 'twilio-video';
import { useEffect, useState, useRef } from 'react';
import useVideoContext from '../../../../hooks/useVideoContext/useVideoContext';

export default function usePreflightTest(publisherToken, subscriberToken) {
  const { isConnecting } = useVideoContext();
  const [testReport, setTestReport] = useState();
  const [testFailure, setTestFailure] = useState();
  const [isTestRunning, setIsTestRunning] = useState(false);
  const preflightTestRef = useRef();

  // This will stop the preflight test when the user connects to a room
  useEffect(() => {
    if (isConnecting) {
      preflightTestRef.current.stop();
      preflightTestRef.current.removeAllListeners('completed');
      preflightTestRef.current.removeAllListeners('failed');
    }
  }, [isConnecting]);

  // This will stop the preflight test when the component is unmounted.
  useEffect(() => {
    return () => {
      preflightTestRef.current.stop();
      preflightTestRef.current.removeAllListeners('completed');
      preflightTestRef.current.removeAllListeners('failed');
    };
  }, []);

  useEffect(() => {
    if (publisherToken && subscriberToken && !testReport && !testFailure && !isTestRunning) {
      setIsTestRunning(true);

      preflightTestRef.current = Video.testPreflight(publisherToken, subscriberToken, {
        duration: TEST_DURATION,
      });

      preflightTestRef.current
        .on('completed', report => {
          setTestReport(report);
          setIsTestRunning(false);
          console.log('Preflight network test completed. See test report below:');
          console.log(report);
        })
        .on('failed', error => {
          setTestFailure(error);
          setIsTestRunning(false);
          console.log('Preflight network test failed. See error below:');
          console.log(error);
        });
    }
  }, [publisherToken, subscriberToken, testReport, testFailure, isTestRunning]);

  return {
    testReport,
    testFailure,
    isTestRunning,
  };
}
