import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, ShieldCheck } from "lucide-react";
import { AddReviewDialog } from "./AddReviewDialog";

interface ProductReviewsProps {
  productId: number;
  language?: "pt" | "en";
}

const translations = {
  pt: {
    reviews: "Avaliações",
    writeReview: "Escrever Avaliação",
    verifiedPurchase: "Compra Verificada",
    helpful: "Útil",
    noReviews: "Ainda não há avaliações para este produto.",
    beFirst: "Seja o primeiro a avaliar!",
    averageRating: "Avaliação Média",
    basedOn: "baseado em",
    review: "avaliação",
    reviews_plural: "avaliações",
    stars: "estrelas",
  },
  en: {
    reviews: "Reviews",
    writeReview: "Write Review",
    verifiedPurchase: "Verified Purchase",
    helpful: "Helpful",
    noReviews: "No reviews yet for this product.",
    beFirst: "Be the first to review!",
    averageRating: "Average Rating",
    basedOn: "based on",
    review: "review",
    reviews_plural: "reviews",
    stars: "stars",
  },
};

export function ProductReviews({ productId, language = "en" }: ProductReviewsProps) {
  const t = translations[language];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: reviews, isLoading: reviewsLoading } = trpc.reviews.getProductReviews.useQuery({ productId });
  const { data: stats } = trpc.reviews.getProductRatingStats.useQuery({ productId });
  const markHelpfulMutation = trpc.reviews.markHelpful.useMutation();
  
  const handleMarkHelpful = (reviewId: number) => {
    markHelpfulMutation.mutate({ reviewId });
  };
  
  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClass = size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5";
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };
  
  if (reviewsLoading) {
    return (
      <Card className="glass-card border-0">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{t.reviews}</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)} className="gradient-accent text-accent-foreground">
              {t.writeReview}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {stats && stats.totalReviews > 0 ? (
            <>
              {/* Rating Summary */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                  <div className="text-5xl font-bold mb-2">{stats.averageRating.toFixed(1)}</div>
                  {renderStars(Math.round(stats.averageRating), "lg")}
                  <p className="text-sm text-muted-foreground mt-2">
                    {t.basedOn} {stats.totalReviews} {stats.totalReviews === 1 ? t.review : t.reviews_plural}
                  </p>
                </div>
                
                {/* Rating Distribution */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = stats.ratingDistribution[star] || 0;
                    const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm w-12">{star} {t.stars}</span>
                        <Progress value={percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Reviews List */}
              <div className="space-y-4 pt-4 border-t">
                {reviews?.map((review) => (
                  <Card key={review.id} className="glass-card border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {renderStars(review.rating)}
                            {review.isVerifiedPurchase && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                {t.verifiedPurchase}
                              </Badge>
                            )}
                          </div>
                          <p className="font-semibold">{review.userName || "Anonymous"}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}
                          </p>
                        </div>
                      </div>
                      
                      {review.title && (
                        <h4 className="font-semibold mb-2">{review.title}</h4>
                      )}
                      
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img) => (
                            <img
                              key={img.id}
                              src={img.imageUrl}
                              alt="Review"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkHelpful(review.id)}
                        className="gap-2"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {t.helpful} ({review.helpfulCount})
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2">{t.noReviews}</h3>
              <p className="text-muted-foreground mb-6">{t.beFirst}</p>
              <Button onClick={() => setIsDialogOpen(true)} className="gradient-accent text-accent-foreground">
                {t.writeReview}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AddReviewDialog
        productId={productId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        language={language}
      />
    </div>
  );
}
