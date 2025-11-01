from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    # ------------------------------------------------------------
    # APP CONFIG
    # ------------------------------------------------------------
    APP_NAME: str = "FastAPI App"
    ENV: str = "development"  # "development" | "production"

    # ------------------------------------------------------------
    # DATABASE CONFIG
    # ------------------------------------------------------------
    USE_POSTGRES: bool = False  # Toggle between SQLite and PostgreSQL

    # SQLite (default)
    SQLITE_PATH: str = "./app.db"

    # PostgreSQL (optional)
    POSTGRES_USER: Optional[str] = None
    POSTGRES_PASSWORD: Optional[str] = None
    POSTGRES_DB: Optional[str] = None
    POSTGRES_HOST: Optional[str] = "localhost"
    POSTGRES_PORT: Optional[int] = 5432

    SECRET_KEY: str = "changeme"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def DB_URL(self) -> str:
        """
        Return the active database URL based on the selected mode.
        """
        if self.USE_POSTGRES:
            return (
                f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
                f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
            )
        return f"sqlite:///{self.SQLITE_PATH}"


# Singleton settings instance
settings = Settings()
