# Generates a branded 1200x630 cover for every blog post and writes it to
# public/blog/covers/<locale>-<slug>.jpg. The blog picks these files up by
# convention (see getPost in src/lib/blog.ts), so a post needs no extra
# frontmatter. A post that sets its own `image:` in frontmatter is skipped.
#
# Run from the repo root (Windows PowerShell 5.1, uses System.Drawing):
#   powershell -ExecutionPolicy Bypass -File scripts\generate-blog-covers.ps1
#
# Re-run it after adding a post or changing a post's title/first tag.
# To use a real image instead, drop it in public/ and set `image:` in the post.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "public\blog\covers"
New-Item -ItemType Directory -Force $outDir | Out-Null
$logoPath = Join-Path $root "public\logo-icon-light.png"

# Posts that should show a real picture next to the title (slug -> image path).
$featureImages = @{
  "shemi-za-evakuatsia" = (Join-Path $root "public\blog\evakuatsionna-shema-primer.jpg")
  "protivopozharni-znaci-iso-7010" = (Join-Path $root "public\blog\covers\_feature-fire-signs.png")
  "znaci-po-patya-za-evakuatsia" = (Join-Path $root "public\blog\covers\_feature-escape-route-signs.png")
  "evakuatsionno-osvetlenie" = (Join-Path $root "public\blog\covers\_feature-evacuation-lighting.png")
}

$W = 1200; $H = 630
$amber = [System.Drawing.Color]::FromArgb(245, 158, 11)

function Read-Frontmatter($file) {
  $text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
  $fm = @{ title = ""; tag = ""; image = $false }
  if ($text -match '(?m)^title:\s*"(.*)"\s*$') { $fm.title = $Matches[1] }
  if ($text -match '(?m)^tags:\s*\[\s*"([^"]*)"') { $fm.tag = $Matches[1] }
  if ($text -match '(?m)^image:\s*"') { $fm.image = $true }
  return $fm
}

function Fit-Font($g, $text, $width, $maxHeight, $maxSize, $minSize) {
  for ($size = $maxSize; $size -ge $minSize; $size -= 2) {
    $font = New-Object System.Drawing.Font("Segoe UI Semibold", $size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $m = $g.MeasureString($text, $font, $width)
    if ($m.Height -le $maxHeight) { return $font }
    $font.Dispose()
  }
  return (New-Object System.Drawing.Font("Segoe UI Semibold", $minSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel))
}

function New-Cover($title, $tag, $outFile, $featurePath) {
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.TextRenderingHint = 'AntiAlias'

  # background gradient
  $rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(11, 18, 32), [System.Drawing.Color]::FromArgb(30, 41, 59), 35.0)
  $g.FillRectangle($grad, $rect)

  # soft amber glow, top right (same idea as the site hero)
  $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $glowPath.AddEllipse(700, -260, 760, 760)
  $glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
  $glow.CenterColor = [System.Drawing.Color]::FromArgb(70, 245, 158, 11)
  $glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 245, 158, 11))
  $g.FillPath($glow, $glowPath)

  # dot grid
  $dot = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(22, 255, 255, 255))
  for ($x = 14; $x -lt $W; $x += 28) { for ($y = 14; $y -lt $H; $y += 28) { $g.FillEllipse($dot, $x, $y, 2, 2) } }

  # logo + wordmark
  if (Test-Path $logoPath) {
    $logo = [System.Drawing.Image]::FromFile($logoPath)
    $lh = 60; $lw = [int]($logo.Width * $lh / $logo.Height)
    $g.DrawImage($logo, 72, 56, $lw, $lh)
    $logo.Dispose()
  }
  $fw = New-Object System.Drawing.Font("Segoe UI Semibold", 32, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString("Fire Advisor", $fw, [System.Drawing.Brushes]::White, 72 + 56, 66)

  $textWidth = 1056
  if ($featurePath -and (Test-Path $featurePath)) {
    $textWidth = 520
    $img = [System.Drawing.Image]::FromFile($featurePath)
    $iw = 520; $ih = [int]($img.Height * $iw / $img.Width)
    $ix = 1200 - 72 - $iw; $iy = [int](($H - $ih) / 2) + 24
    $shadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(90, 0, 0, 0))
    $g.FillRectangle($shadow, $ix + 6, $iy + 10, $iw, $ih)
    $g.FillRectangle([System.Drawing.Brushes]::White, $ix - 4, $iy - 4, $iw + 8, $ih + 8)
    $g.DrawImage($img, $ix, $iy, $iw, $ih)
    $img.Dispose()
  }

  # kicker (first tag)
  if ($tag) {
    $fk = New-Object System.Drawing.Font("Segoe UI Semibold", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $sfk = New-Object System.Drawing.StringFormat
    $g.DrawString($tag.ToUpper(), $fk, (New-Object System.Drawing.SolidBrush($amber)), 72, 188)
  }

  # title (auto-fit)
  $titleFont = Fit-Font $g $title $textWidth 270 60 30
  $trect = New-Object System.Drawing.RectangleF(72, 232, $textWidth, 290)
  $g.DrawString($title, $titleFont, [System.Drawing.Brushes]::White, $trect)

  # bottom bar + url
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($amber)), 0, $H - 10, $W, 10)
  $fu = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString("fireadvisor.eu", $fu, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(160, 174, 192))), 72, $H - 62)

  $g.Dispose()
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 88L)
  $bmp.Save($outFile, $enc, $ep)
  $bmp.Dispose()
}

foreach ($locale in @("bg", "en")) {
  $dir = Join-Path $root "content\blog\$locale"
  if (-not (Test-Path $dir)) { continue }
  foreach ($file in Get-ChildItem $dir -Filter *.mdx) {
    $slug = $file.BaseName
    $fm = Read-Frontmatter $file.FullName
    if ($fm.image) { "skip  $locale/$slug (has its own image)"; continue }
    if (-not $fm.title) { "skip  $locale/$slug (no title)"; continue }
    $out = Join-Path $outDir "$locale-$slug.jpg"
    $feature = $null
    if ($featureImages.ContainsKey($slug)) { $feature = $featureImages[$slug] }
    New-Cover $fm.title $fm.tag $out $feature
    "cover $locale/$slug -> " + (Split-Path -Leaf $out)
  }
}
