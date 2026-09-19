#!/usr/bin/env bash

set -euo pipefail

CONTAINER_NAME="${ORANGEHRM_CONTAINER_NAME:-workforce-orangehrm-app}"
INSTALLER_DIR="/var/www/html/installer"
CONFIG_PATH="${INSTALLER_DIR}/cli_install_config.yaml"

cleanup_installer_config() {
  docker exec "${CONTAINER_NAME}" \
    rm -f "${CONFIG_PATH}" >/dev/null 2>&1 || true
}

trap cleanup_installer_config EXIT

required_vars=(
  DB_NAME
  DB_USER
  DB_PASSWORD
  ADMIN_USERNAME
  ADMIN_PASSWORD
)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "ERROR: Required environment variable '${var_name}' is not set."
    exit 1
  fi
done

echo "Waiting for OrangeHRM installer..."

MAX_ATTEMPTS=60
SLEEP_SECONDS=2

for ((attempt = 1; attempt <= MAX_ATTEMPTS; attempt++)); do
  if docker exec "${CONTAINER_NAME}" \
    test -f "${INSTALLER_DIR}/cli_install.php" 2>/dev/null; then
    echo "OrangeHRM installer is available."
    break
  fi

  if (( attempt == MAX_ATTEMPTS )); then
    echo "ERROR: OrangeHRM installer was not available after $((MAX_ATTEMPTS * SLEEP_SECONDS)) seconds."
    exit 1
  fi

  sleep "${SLEEP_SECONDS}"
done

echo "Creating temporary OrangeHRM installer configuration..."

docker exec -i "${CONTAINER_NAME}" sh -c "cat > '${CONFIG_PATH}'" <<EOF
database:
  hostName: db
  hostPort: 3306
  databaseName: ${DB_NAME}
  privilegedDatabaseUser: ${DB_USER}
  privilegedDatabasePassword: ${DB_PASSWORD}
  useSameDbUserForOrangeHRM: y
  orangehrmDatabaseUser: ~
  orangehrmDatabasePassword: ~
  isExistingDatabase: y
  enableDataEncryption: n

organization:
  name: QA Automation
  country: VN

admin:
  adminUserName: ${ADMIN_USERNAME}
  adminPassword: ${ADMIN_PASSWORD}
  adminEmployeeFirstName: QA
  adminEmployeeLastName: Admin
  workEmail: qa.admin@example.com
  contactNumber: ~
  registrationConsent: false

license:
  agree: y
EOF

echo "Installing OrangeHRM..."

docker exec "${CONTAINER_NAME}" \
  sh -c "cd /var/www/html && php installer/cli_install.php"

echo "OrangeHRM bootstrap completed."