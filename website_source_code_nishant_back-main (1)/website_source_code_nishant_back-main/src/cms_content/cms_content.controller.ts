import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { CmsContentService } from './cms_content.service';
import { CreateCmsContentDto } from './dto/create-cms_content.dto';
import { UpdateCmsContentDto, UpdateJsonContentChildImageDto } from './dto/update-cms_content.dto';
import { PageType } from './entities/cms_content.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('cms-content')
export class CmsContentController {
  constructor(private readonly cmsContentService: CmsContentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':page_type')
  // 🌟 FIX: Allow both image and video fields during creation to prevent 400 error
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]))
  async create(
    @Param('page_type') page_type: PageType,
    @Body() createCmsContentDto: any, // Changed to any to accept dynamic video inject
    @UploadedFiles() files: { image?: Express.Multer.File[], video?: Express.Multer.File[] },
  ) {
    const imagePath = files?.image?.[0]?.filename || files?.image?.[0]?.path || null;
    
    // Inject video path directly into the DTO so the service saves it into the JSON blob
    if (files?.video?.[0]) {
       createCmsContentDto.video = files.video[0].filename || files.video[0].path;
    }

    return this.cmsContentService.create(page_type, createCmsContentDto, imagePath);
  }

  @Get()
  findAll() {
    return this.cmsContentService.findAll();
  }

  @Get(':page_type')
  findOne(@Param('page_type') page_type: PageType) {
    return this.cmsContentService.findOne(page_type);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCmsContentDto: UpdateCmsContentDto) {
    return this.cmsContentService.update(+id, updateCmsContentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-with-image/:id')
  // 🌟 FIX: Allow legacy meet_us image key, new image key, AND the new video key to prevent 400 error
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'json_content[mid_image]', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]))
  async updateWithImage(
    @Param('id') id: number,
    @Body() updateCmsContentDto: any, // Changed to any to accept dynamic video inject
    @UploadedFiles() files: { 'json_content[mid_image]'?: Express.Multer.File[], image?: Express.Multer.File[], video?: Express.Multer.File[] },
  ) {
    // Safely extract the image path regardless of whether it came from the old form or new form
    const imagePath = 
        files?.['json_content[mid_image]']?.[0]?.filename || 
        files?.image?.[0]?.filename || 
        files?.['json_content[mid_image]']?.[0]?.path || 
        files?.image?.[0]?.path || 
        null;

    // Inject video path directly into the DTO so the service saves it into the JSON blob
    if (files?.video?.[0]) {
        updateCmsContentDto.video = files.video[0].filename || files.video[0].path;
    }

    return this.cmsContentService.updateWithImage(+id, updateCmsContentDto, imagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-json-child-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateJsonChildImage(
    @Param('id') id: number,
    @Body() updateCmsContentDto: UpdateJsonContentChildImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file?.path : null;
    return this.cmsContentService.updateJsonContentChildImage(+id, updateCmsContentDto, imagePath);
  }

  // 🌟 PRESERVED: Your live logic for mobile_banner_image is safely kept here!
  @UseGuards(AuthGuard('jwt'))
  @Patch('update-json-homepage-banner/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'top_icon', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
    { name: 'mobile_banner_image', maxCount: 1 },
  ]))
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCmsContentDto: any,
    @UploadedFiles() files: { banner_image?: Express.Multer.File[], top_icon?: Express.Multer.File[], mobile_banner_image?: Express.Multer.File[] },
  ) {
    const topIconPath = files.top_icon ? files.top_icon[0].filename : null;
    const bannerImagePath = files.banner_image ? files.banner_image[0].filename : null;
    const mobileBannerImagePath = files.mobile_banner_image ? files.mobile_banner_image[0].filename : null;

    return this.cmsContentService.updateJsonContentHomepageBanner(id, updateCmsContentDto, topIconPath, bannerImagePath, mobileBannerImagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-estimate-cards/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateEstimateCards(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCmsContentDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.filename : null;
    return this.cmsContentService.updateEstimateCards(id, updateCmsContentDto, imagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.cmsContentService.remove(+id);
  }
}