-- Run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → paste → Run)

-- Step 1: Delete garbage tournaments
-- Catches all rows with 0 capacity AND all rows with random-string titles
DELETE FROM tournaments
WHERE
  max_participants = 0
  OR max_participants IS NULL
  OR (title ~ '^[a-z0-9]+$' AND length(title) > 8);

-- Step 2: See what's left (should be only your real tournaments)
SELECT id, title, game, max_participants, start_date, status
FROM tournaments
ORDER BY created_at DESC;
