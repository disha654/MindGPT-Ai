param(
  [int]$Port = 5000
)

$repo = Split-Path -Parent $PSScriptRoot
$serverPath = Join-Path $repo "server.js"
$pidPath = Join-Path $repo ".mindgpt.pid"

if (Test-Path $pidPath) {
  $existingPid = Get-Content $pidPath -ErrorAction SilentlyContinue
  if ($existingPid -and (Get-Process -Id $existingPid -ErrorAction SilentlyContinue)) {
    Write-Output "MindGPT is already running (PID $existingPid)."
    exit 0
  }
  Remove-Item $pidPath -Force -ErrorAction SilentlyContinue
}

$proc = Start-Process node -ArgumentList $serverPath -WorkingDirectory $repo -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 2

$healthUrl = "http://localhost:$Port/health"
try {
  $resp = Invoke-WebRequest -UseBasicParsing $healthUrl -TimeoutSec 10
  Set-Content -Path $pidPath -Value $proc.Id -Encoding ASCII
  Write-Output "MindGPT started at http://localhost:$Port (PID $($proc.Id))"
  Write-Output $resp.Content
} catch {
  Write-Output "Started process PID $($proc.Id), but health check failed: $($_.Exception.Message)"
  exit 1
}
