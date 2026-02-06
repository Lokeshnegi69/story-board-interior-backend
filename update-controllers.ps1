$controllers = @(
    "authController.ts",
    "categoryController.ts",
    "dashboardController.ts",
    "designEthosController.ts",
    "heroController.ts",
    "inquiryController.ts",
    "projectController.ts",
    "serviceController.ts",
    "serviceDetailController.ts",
    "testimonialController.ts",
    "userController.ts"
)

$basePath = "c:\Users\Satyansh\Downloads\story-board-interior-final\project\backend\src\controllers"

foreach ($controller in $controllers) {
    $filePath = Join-Path $basePath $controller
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Replace import statement
        $content = $content -replace "import \{ Request, Response \} from 'express';", "import \{ Response \} from 'express';`r`nimport \{ AuthRequest \} from '../middleware/auth';"
        
        # Replace all Request types with AuthRequest (but not Response)
        $content = $content -replace "(\(.*?)(Request)(,.*?Response.*?\))", '$1AuthRequest$3'
        $content = $content -replace "(\s)(Request)(\s*,\s*Response)", '$1AuthRequest$3'
        
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "Updated: $controller"
    }
}

Write-Host "All controllers updated!"
