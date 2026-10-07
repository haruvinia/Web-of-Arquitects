Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$assetDirectory = Join-Path $projectRoot 'public/images'
New-Item -ItemType Directory -Path $assetDirectory -Force | Out-Null

# Coordinates use the reference preview dimensions, then scale to the original PNG.
function Export-Crop($Source, $Name, $PreviewWidth, $PreviewHeight, $X, $Y, $Width, $Height) {
    $original = [System.Drawing.Image]::FromFile((Join-Path $projectRoot "Design/$Source"))
    $region = [System.Drawing.RectangleF]::new(
        $X * $original.Width / $PreviewWidth,
        $Y * $original.Height / $PreviewHeight,
        $Width * $original.Width / $PreviewWidth,
        $Height * $original.Height / $PreviewHeight
    )
    $scale = [Math]::Min([double]1, [double](1600 / [Math]::Max($region.Width, $region.Height)))
    $bitmap = [System.Drawing.Bitmap]::new([int]($region.Width * $scale), [int]($region.Height * $scale))
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($original, [System.Drawing.RectangleF]::new(0, 0, $bitmap.Width, $bitmap.Height), $region, [System.Drawing.GraphicsUnit]::Pixel)
    if ($Name -eq 'logo') {
        $bitmap.Save((Join-Path $assetDirectory "$Name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
        $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]90)
        $bitmap.Save((Join-Path $assetDirectory "$Name.jpg"), $encoder, $parameters)
        $parameters.Dispose()
        $oldPng = Join-Path $assetDirectory "$Name.png"
        if (Test-Path -LiteralPath $oldPng) { Remove-Item -LiteralPath $oldPng }
    }
    $graphics.Dispose()
    $bitmap.Dispose()
    $original.Dispose()
}

Export-Crop 'Projeto Forum.png' 'hero' 728 2048 271 54 388 418
Export-Crop 'Projeto Forum.png' 'about-1' 728 2048 119 548 136 134
Export-Crop 'Projeto Forum.png' 'about-2' 728 2048 119 697 136 70
Export-Crop 'Projeto Forum.png' 'about-3' 728 2048 271 564 135 173
Export-Crop 'Projeto Forum.png' 'featured-1' 728 2048 69 1088 287 128
Export-Crop 'Projeto Forum.png' 'featured-2' 728 2048 372 1088 287 128
Export-Crop 'Projeto Forum.png' 'featured-3' 728 2048 69 1232 135 128
Export-Crop 'Projeto Forum.png' 'featured-4' 728 2048 220 1232 237 128
Export-Crop 'Projeto Forum.png' 'featured-5' 728 2048 474 1232 185 128
Export-Crop 'Projeto Forum.png' 'contact-person' 728 2048 282 1516 377 185
Export-Crop 'Projects.png' 'project-1' 1215 2048 114 298 565 367
Export-Crop 'Projects.png' 'project-2' 1215 2048 114 716 565 366
Export-Crop 'Projects.png' 'project-3' 1215 2048 114 1134 565 365
Export-Crop 'Example of Project.png' 'detail-main' 1271 1984 120 312 1031 383
Export-Crop 'Example of Project.png' 'detail-side' 1271 1984 120 723 368 376
Export-Crop 'Example of Project.png' 'detail-plan' 1271 1984 120 1127 1031 383
Export-Crop 'Contacts.png' 'map' 1773 1407 802 131 971 613
Export-Crop 'Projeto Forum.png' 'logo' 728 2048 68 14 36 23

$columns = @(142, 394, 646, 898, 1150)
for ($row = 0; $row -lt 2; $row++) {
    for ($column = 0; $column -lt 5; $column++) {
        $number = $row * 5 + $column + 1
        Export-Crop 'Gallery.png' "gallery-$number" 1512 1632 $columns[$column] (372 + $row * 304) 220 272
    }
}
