-- Exercise 4: Peak Session Hours
-- Count how many sessions are scheduled between 10 AM to 12 PM for each event.
SELECT event_id, COUNT(session_id) AS session_count
FROM Sessions
WHERE TIME(start_time) >= '10:00:00' 
  AND TIME(start_time) <= '12:00:00'
GROUP BY event_id;

