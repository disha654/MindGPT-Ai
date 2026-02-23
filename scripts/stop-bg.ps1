$repo = Split-Path -Parent $PSScriptRoot
$pidPath = Join-Path $repo ".mindgpt.pid"

if (-not (Test-Path $pidPath)) {
  Write-Output "No PID file found. MindGPT may already be stopped."
  exit 0
}

$pidValue = Get-Content $pidPath -ErrorAction SilentlyContinue
if (-not $pidValue) {
  Remove-Item $pidPath -Force -ErrorAction SilentlyContinue
  Write-Output "PID file was empty."
  exit 0
}

$proc = Get-Process -Id $pidValue -ErrorAction SilentlyContinue
if ($proc) {
  Stop-Process -Id $pidValue -Force
  Write-Output "Stopped MindGPT (PID $pidValue)."
} else {
  Write-Output "Process $pidValue not running."
}

Remove-Item $pidPath -Force -ErrorAction SilentlyContinue
