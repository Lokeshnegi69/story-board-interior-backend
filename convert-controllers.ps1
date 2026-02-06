# PowerShell script to convert ES6 imports to CommonJS in controller files

$controllersPath = "src\controllers"
$files = Get-ChildItem -Path $controllersPath -Filter "*.js"

foreach ($file in $files) {
    $filePath = $file.FullName
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $filePath -Raw
    
    # Convert import statements to require
    $content = $content -replace "import\s+\{\s*([^}]+)\s*\}\s+from\s+'([^']+)';", 'const { $1 } = require(''$2'');'
    $content = $content -replace "import\s+([^\s]+)\s+from\s+'([^']+)';", 'const $1 = require(''$2'');'
    
    # Convert export const to module.exports
    $content = $content -replace "export const (\w+)\s*=", 'const $1 ='
    
    # Remove TypeScript type annotations from function parameters
    $content = $content -replace ":\s*AuthRequest", ""
    $content = $content -replace ":\s*Response", ""
    $content = $content -replace ":\s*NextFunction", ""
    $content = $content -replace ":\s*any", ""
    
    # Add module.exports at the end if not present
    if ($content -notmatch "module\.exports") {
        # Extract all exported function names
        $exports = [regex]::Matches($content, "const\s+(\w+)\s*=\s*asyncHandler") | ForEach-Object { $_.Groups[1].Value }
        
        if ($exports.Count -gt 0) {
            $exportList = ($exports | ForEach-Object { "  $_," }) -join "`n"
            $moduleExports = "`n`nmodule.exports = {`n$exportList`n};"
            $content += $moduleExports
        }
    }
    
    # Write the modified content back
    Set-Content -Path $filePath -Value $content -NoNewline
}

Write-Host "Conversion complete!"
