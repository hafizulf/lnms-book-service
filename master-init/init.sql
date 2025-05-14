DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_database WHERE datname = 'lnms_book'
  ) THEN
    CREATE DATABASE lnms_book;
  END IF;
END
$$;
