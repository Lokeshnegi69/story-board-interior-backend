$controllers = @(
    "authController.ts",
    "categoryController.ts",
    "dashboardController.ts",
    "designEthosController.ts",
    "heroController.ts",
    "inquiryController.ts",
    "projectController.ts",
    "serviceController.ts",
    "testimonialController.ts",
    "userController.ts"
)

$basePath = "c:\Users\Satyansh\Downloads\story-board-interior-final\project\backend\src\controllers"

foreach ($controller in $controllers) {
    $filePath = Join-Path $basePath $controller
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Fix AuthAuthRequest to AuthRequest
        $content = $content -replace "AuthAuthRequest", "AuthRequest"
        
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "Fixed: $controller"
    }
}

Write-Host "All controllers fixed!"
